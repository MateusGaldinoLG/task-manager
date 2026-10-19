import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if(!databaseUrl){
    throw new Error("DATABASE_URL is not defined");
}

if(databaseUrl){
    console.log(databaseUrl)
}

export const env = {
    DATABASE_URL: databaseUrl,
    PORT: Number(process.env.PORT ?? 8080)
}