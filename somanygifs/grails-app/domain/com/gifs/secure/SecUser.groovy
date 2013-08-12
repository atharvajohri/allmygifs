package com.gifs.secure

import com.gifs.core.Gif
import com.gifs.core.Tag
import com.gifs.core.PopularityCount
import java.util.Date;

class SecUser {

	transient springSecurityService

	String username
	String password
	String name
	boolean enabled = true
	boolean isSupervisor = false
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
	Date dateCreated
	
	static hasMany = [addedGifs: Gif, addedTags: Tag, popularityCounts: PopularityCount]

	static constraints = {
		username blank: false, unique: true
		password blank: false
		name nullable: true
	}

	static mapping = {
		password column: '`password`'
	}

	Set<SecRole> getAuthorities() {
		SecUserSecRole.findAllBySecUser(this).collect { it.secRole } as Set
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}
}
