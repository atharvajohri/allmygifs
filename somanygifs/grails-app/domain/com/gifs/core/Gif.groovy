package com.gifs.core

class Gif {

	String link
	Date dateCreated
	String title
	User addedBy
	
	static hasMany = [popularityCounts: Popularity, tags: Tag]
	static belongsTo = User
	static enabled = true
	
    static constraints = {
    }
}
