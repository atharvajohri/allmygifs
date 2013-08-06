package com.gifs.core

import com.gifs.secure.SecUser

class Gif {

	String link
	Date dateCreated
	String title
	SecUser addedBy
	String urlMapping
	
	static hasMany = [tags: Tag, popularityCounts: PopularityCount, comments:Comment]
	static belongsTo = SecUser
	static enabled = true
	
    static constraints = {
		link nullable:false, blank:false, url:true, maxSize:250
		title nullable:false, blank:false, unique:true, maxSize:50
		urlMapping unique:true, blank:false
    }
	
	static mapping = {
		sort dateCreated:"desc"
	}
	
}
