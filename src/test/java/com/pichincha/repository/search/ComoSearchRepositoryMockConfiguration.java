package com.pichincha.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ComoSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ComoSearchRepositoryMockConfiguration {

    @MockBean
    private ComoSearchRepository mockComoSearchRepository;

}
