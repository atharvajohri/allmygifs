class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(controller:"gif", action:"home")//(view:"/index")
		"/add"(controller:"gif", action:"add")//(view:"/index")
		"/home"(controller:"gif", action:"home")//(view:"/index")
		"500"(view:'/error')
	}
}
