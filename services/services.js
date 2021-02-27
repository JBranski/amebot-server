const requestsService = {
	addRequest( db, newRequest ) {
		return db
			.insert( newRequest )
			.into( 'requests' )
			.returning( '*' )
			.then( result => {
				return result[0]
			});
	}
}

module.exports = requestsService;