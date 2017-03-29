package com.example.services;

import org.mindrot.jbcrypt.BCrypt;

public class HashService {
	private static int workload = 12;

	public static String hashPassword(String rawPassword) {
		String salt = BCrypt.gensalt(workload);
		String hashed_password = BCrypt.hashpw(rawPassword, salt);
		return(hashed_password);
	}


	public static boolean checkPassword(String rawPassword, String hashedPassword) {
		boolean password_verified = false;
		if(null == hashedPassword || !hashedPassword.startsWith("$2a$"))
			throw new java.lang.IllegalArgumentException("Invalid hash provided for comparison");
		password_verified = BCrypt.checkpw(rawPassword, hashedPassword);
		return(password_verified);
	}

}
