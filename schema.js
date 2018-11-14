const{GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLBoolean,GraphQLList,GraphQLSchema}=require('graphql');
const axios=require('axios');

// launch type
const LaunchType=new GraphQLObjectType({
    name:'Launch',
    fields:()=>({
        flight_number:{type:GraphQLInt},
        mission_name:{type:GraphQLString},
        launch_year:{type:GraphQLString},
        launch_date_local:{type:GraphQLString},
        launch_success:{type:GraphQLBoolean},
        rocket:{type:RocketType}
    })
});

// rocket type
const RocketType=new GraphQLObjectType({
    name:'Rocket',
    fields:()=>({
        rocket_id:{type:GraphQLString},
        rocket_name:{type:GraphQLString},
        rocket_type:{type:GraphQLString}
    })
});

// root query
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:()=>({
        launches:{
            // fetch launches data
            type:GraphQLList(LaunchType),
            resolve(parent,args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res=>res.data);
            }
        },
        launch:{
            type:LaunchType,
            // query by flight_number
            args:{
                flight_number:{type:GraphQLInt}
            },
            resolve(parent,args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res=>res.data);
            }
        },

        // rockets
        rockets:{
            // fetch launches data
            type:GraphQLList(RocketType),
            resolve(parent,args){
                return axios.get('https://api.spacexdata.com/v3/rockets')
                .then(res=>res.data);
            }
        },
        rocket:{
            type:RocketType,
            // query by rocket_id
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parent,args){
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(res=>res.data);
            }
        }
    })
});



module.exports=new GraphQLSchema({
    query:RootQuery
});