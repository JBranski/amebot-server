const express = require( 'express' );
const router = express.Router();
const jsonParser = express.json();
const services = require( './../services/services' );

router
	.post('/requests', jsonParser, ( req, res, next ) => {
		const newRequest = {
			name : req.body.name,
			command : req.body.command,
			comresponse : req.body.comresponse
		}

		services
			.addRequest( req.app.get( 'db' ), newRequest )
			.then( result => {
				return res.status( 201 ).json( result );
			})
			.catch( next );
	})

	module.exports = router;