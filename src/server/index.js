
import express from 'express';
import cors from 'cors';
import path from 'path';
import db from '../db';

const app = express( );
app.use( express.static( 'public' ) );
// app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( cors( ) );
app.use( express.json( ) );
app.use( express.urlencoded( { extended: false } ) );

app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../client/App/App.html' ) );
});

app.listen( 8080, ( ) => {
    console.log( 'Fuel App server running on port 8080.' );
});