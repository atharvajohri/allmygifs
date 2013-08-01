package com.gifs

import org.apache.commons.codec.binary.Base64

class UtilService {
	
	//decodes a base64 'string'
	def decodeBase64(string){
		String payload = string.split("[.]", 2)[1];
		payload = payload.replace("-", "+").replace("_", "/").trim();
		return new String(Base64.decodeBase64(payload.getBytes()));
	}
	
	//generates 'n' character long random string from the character set 'alphabet'
	def generator = { String alphabet, int n ->
		new Random().with {
			(1..n).collect { alphabet[ nextInt( alphabet.length() ) ] }.join()
		}
	}
	
}
