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
		"/comment"(controller:"gif", action:"comment")//(view:"/index")
		"/facebookLogin"(controller:"secUser", action:"facebookLogin")//(view:"/index")
		"500"(view:'/error')
	}
}
