
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from '../db';

const app = express( );
app.use( express.static( 'public' ) );
app.use( cors( ) );
app.use( bodyParser.json( ) );
app.use( bodyParser.urlencoded( { extended: false } ) );

app.listen( 8080, ( ) => {
    console.log( 'Fuel App server running on port 8080.' );
});