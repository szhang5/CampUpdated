module.exports = {
    development: {
      databaseurl: "mongodb://localhost/yelp_camp",
      aws: {
        accessKeyId: "AKIAJ5MHHYAIRWS5ZXOQ", //remember to put your own accessKeyId here
        secretAccessKey: "eHmoTQ6Gs9B9m9227/Yz7XgfANijzH17J/I7PvW2", //remember to put your own secretAccessKey here
        region: "us-west-2",
        apiVersions: {
         s3: "2006-03-01",
         ses: "2010-12-01"
        }
      }
    },
    test: {
      databaseurl: "mongodb://shiyun:ZSYqq490562824@ds239940.mlab.com:39940/yelpcamp",
      aws: {
        accessKeyId: "AKIAJ5MHHYAIRWS5ZXOQ", //remember to put your own accessKeyId here
        secretAccessKey: "eHmoTQ6Gs9B9m9227/Yz7XgfANijzH17J/I7PvW2", //remember to put your own secretAccessKey here
        region: "us-west-2",
        apiVersions: {
         s3: "2006-03-01",
         ses: "2010-12-01"
        }
      }
    },
    production:{
      databaseurl: "mongodb://shiyun:ZSYqq490562824@ds239940.mlab.com:39940/yelpcamp",
      aws:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // replace it by development accessKeyId
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, //replace it by development secretAccessKey
        region: process.env.AWS_REGION,
        apiVersions: {
          "s3": "2006-03-01",
          "ses": "2010-12-01"
        }
      }
    }
    
  }