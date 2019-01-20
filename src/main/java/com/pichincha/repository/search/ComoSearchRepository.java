package com.pichincha.repository.search;

import com.pichincha.domain.Como;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Como entity.
 */
public interface ComoSearchRepository extends ElasticsearchRepository<Como, Long> {
}
