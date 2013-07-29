package com.gifs

import org.apache.commons.codec.binary.Base64

class UtilService {
	
	def decodeBase64(string){
		String payload = string.split("[.]", 2)[1];
		payload = payload.replace("-", "+").replace("_", "/").trim();
		return new String(Base64.decodeBase64(payload.getBytes()));
	}

}
