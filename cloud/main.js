// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:

var _ = require("underscore");

AV.Cloud.define("leadboard", function(request, response) {
	var query = new AV.Query("Activity");
	query.equalTo("city", request.params.city);
	//query.equalTo("objectId", "5312b6bee4b0ae449c68d7d2");
	query.find({
		success: function(results) {
			var stars = [];
			// retrive data
			for (var i = 0; i < results.length; ++i) {
				var score = results[i].get("last_3_month");
				var user_id = results[i].get("user_uuid");
				var rank = i;
				stars.push({"is_self": user_id == 1, "rank": rank, "last_3_month": score});
			}
			// sort
			var rank_scores = _.sortBy(stars, function(item){ 
				return -1 * parseInt(item.last_3_month); 
			});
			// set ranks
			for (var i = 0; i < rank_scores.length; ++i) {
				rank_scores[i].rank = i+1;
			}
			response.success(rank_scores); //sum / results.length);
		},
		error: function() {
			response.error("movie lookup failed");
		}
	});
});

AV.Cloud.define("hello", function(request, response) {
	/* user_uuid, number, city_str */
	/* rank, score */
	response.success("!!!ksdjflksdjfksj Hello world!");
});
