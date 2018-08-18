var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
     name: "Colorado",
     image: "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1487975567%2Fcolorado-Great-Sand-Dunes-National-Park-50CAMP0217.jpg%3Fitok%3D6kyqjAGT&w=800&q=85",
     description: "Piñon Flats Campground, Great Sand Dunes National Park. Mountains of sand may not be the first thing that comes to mind in Colorado, but the nation’s largest dunes soar over 700 feet into the sky at this popular park. Eighty-eight sites in two separate loops accommodate tents or RVs, but your best bet is grabbing a free backcountry permit and finding your own corner of the 30-mile dune field for an otherworldly night under the stars."
    },
    {
     name: "Outpost at Gulf State Park",
     image: "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1487975567%2Fcalifornia-julia-pfeiffer-burns-state-park-50CAMP0217.jpg%3Fitok%3D8S8b2C0W&w=800&q=85",
     description: "Numerous studies have found benefits to spending time in the outdoors: better concentration, elevated mood, even faster healing and improved sleep patterns."
    },
    {
     name: "Bartlett Cove Campground",
     image: "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1487975567%2Farkansas-buffalo-national-river-50CAMP0217.jpg%3Fitok%3D__5SEwCJ&w=800&q=85",
     description: "America’s first national river travels 135 miles through the Ozark Mountains, chugging over rapids, forming peaceful pools and passing rocky bluffs topped by emerald forest. Plan a float trip and absorb the scenery at a leisurely pace, pausing for hikes to visit Lost Valley’s caverns or the 200-foot Hemmed-in Hollow falls."
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
       // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                  console.log(err);
                }else{
                  console.log("added a campground");
                  //create a comment
                  Comment.create(
                        {
                          text: "This place is great, but I wish there was internet",
                          author: "Homer"
                        }, function(err, comment){
                          if(err){
                              console.log(err);
                          }else{
                              campground.comments.push(comment);
                              campground.save();
                              console.log("Created new comment");
                          }
                        });
                }
            }); 
        });
    });
}

module.exports = seedDB;
