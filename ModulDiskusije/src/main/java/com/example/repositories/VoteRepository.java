package com.example.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Vote;

@RepositoryRestResource(path="votes",collectionResourceRel="votes")
public interface VoteRepository extends CrudRepository<Vote, Long>{

	//@Modifying
	//@Transactional
	//@Query("delete from Vote v where v.user.id=:user and v.comment.id=:comment")
	//public int deletevote(@Param("user") Long user, @Param("comment") Long comment);
	
	@Query("select v from Vote v where v.regUser.id=:userId and v.comment.id=:commentId")
	public Vote findVoteByUserAndComment(@Param("userId") Long userId,@Param("commentId") Long commentId);
	
	@Query("select count(v) from Vote v where v.comment.id=:id and v.number=1")
	public int positiveVotesForComment(@Param("id") Long id);
	
	@Query("select count(v) from Vote v where v.comment.id=:id and v.number=-1")
	public int negativeVotesForComment(@Param("id") Long id);
	
	@Query("select count(v) from Vote v,Comment c where c.regUser.id=:id and v.comment.id=c.id and v.number=-1")
	public int negativeVotesOfUser(@Param("id") Long id);
	
	@Query("select count(v) from Vote v,Comment c where c.regUser.id=:id and v.comment.id=c.id and v.number=1")
	public int positiveVotesOfUser(@Param("id") Long id);
	
	
}
