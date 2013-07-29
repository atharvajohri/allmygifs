class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(controller:"gif", action:"index")//(view:"/index")
		"500"(view:'/error')
	}
}
