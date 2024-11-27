import { Elysia } from "elysia";
import { AppDataSource } from "data-source";
import { Coord } from "entity/Coord";

export default new Elysia({"name": "coord"}).group("/coord", (group) =>
    group
        .get("/set-coord/:lat/:lon", async ({ params }) => {
            const lat = parseFloat(params.lat);
            const lon = parseFloat(params.lon);
        
            const coord_repo = AppDataSource.getRepository(Coord)
        
            const new_coord = coord_repo.create({
                lat: lat,
                lng: lon,
            });
            
            await coord_repo.save(new_coord);
        
            return { status: 200, body:`OK` };
        })
        .get("/set-speed/:speed", async ({ params }) => {
            const speed = parseFloat(params.speed);
        
            const coord_repo = AppDataSource.getRepository(Coord)
        
            const new_coord = coord_repo.create({
                speed: speed,
            });
            
            await coord_repo.save(new_coord);
        
            return { status: 200, body:`OK` };
        })
        .get("/set-limit/:limit", async ({ params }) => {
            const limit = parseFloat(params.limit);
        
            const coord_repo = AppDataSource.getRepository(Coord)
        
            const new_coord = coord_repo.create({
                limit: limit,
            });
            
            await coord_repo.save(new_coord);
        
            return { status: 200, body:`OK` };
        })
);