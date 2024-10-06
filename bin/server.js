#!/usr/bin/env node

import express from "express";
import {program} from "commander"
import {getData } from "../commands/getData.js";
import NodeCache from "node-cache"
const myCache = new NodeCache({ stdTTL: 600 });


const app = express();

program
    .requiredOption('--port <number>')
    .requiredOption('--origin <url>')
    .action(options =>{
        app.listen(options.port, async() => {
              
        //console.log(await caching(options.origin))
        console.log(`Server listening on http://localhost:${options.port}`);
        });


        const endpoint = options.origin.split("/")[3]  
        app.get(`/${endpoint}`, async(req,res)=>{
            try {
            let data = myCache.get("data")
                    if(data == null){
                        data = await getData(options.origin)
                        myCache.set("data", data, 300)
                        console.log("X-Cache: MISS")
                    } else{
                        console.log("X-Cache: HIT")
                    }
                
                res.status(200).send(data);
                } catch (err) {
                console.log(err);
                res.sendStatus(500);
                }
            
        })
     })




program.parse(process.argv);


