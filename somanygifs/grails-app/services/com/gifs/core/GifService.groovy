package com.gifs.core

import java.text.SimpleDateFormat

class GifService {
	def obtainGifPackage(params){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
		params.gifDate = params.gifDate ? df.parse(params.gifDate.toString()) : new Date()
		return Gif.findAllByDateCreatedLessThan(params.gifDate, [offset:Long.parseLong(params.offset.toString()), max:Long.parseLong(params.size.toString())])
	}
}
