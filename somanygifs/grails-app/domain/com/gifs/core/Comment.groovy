package com.gifs.core

import com.gifs.secure.SecUser

class Comment {
	
	String comment
	SecUser user
	Gif gif
	Date dateCreated
	Boolean enabled = true
	static hasMany = [popularityCounts: PopularityCount]
	static belongsTo = Gif
	
    static constraints = {
		comment blank:false, maxSize:1024
    }
	
	static mapping = {
		sort dateCreated:"desc"
	}
}
