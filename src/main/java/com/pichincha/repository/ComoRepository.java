package com.pichincha.repository;

import com.pichincha.domain.Como;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Como entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComoRepository extends JpaRepository<Como, Long> {

    @Query(value = "select distinct como from Como como left join fetch como.tags",
        countQuery = "select count(distinct como) from Como como")
    Page<Como> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct como from Como como left join fetch como.tags")
    List<Como> findAllWithEagerRelationships();

    @Query("select como from Como como left join fetch como.tags where como.id =:id")
    Optional<Como> findOneWithEagerRelationships(@Param("id") Long id);

}
