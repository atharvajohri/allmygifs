package com.gifs.core

class GifService {
	def obtainGifPackage(packageSize, offset){
		return Gif.list([offset:Long.parseLong(offset.toString()), max:Long.parseLong(packageSize.toString())])
	}
}
