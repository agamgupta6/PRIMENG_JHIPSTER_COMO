package com.pichincha.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pichincha.domain.Como;
import com.pichincha.repository.ComoRepository;
import com.pichincha.repository.search.ComoSearchRepository;
import com.pichincha.web.rest.errors.BadRequestAlertException;
import com.pichincha.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Como.
 */
@RestController
@RequestMapping("/api")
public class ComoResource {

    private final Logger log = LoggerFactory.getLogger(ComoResource.class);

    private static final String ENTITY_NAME = "como";

    private final ComoRepository comoRepository;

    private final ComoSearchRepository comoSearchRepository;

    public ComoResource(ComoRepository comoRepository, ComoSearchRepository comoSearchRepository) {
        this.comoRepository = comoRepository;
        this.comoSearchRepository = comoSearchRepository;
    }

    /**
     * POST  /comos : Create a new como.
     *
     * @param como the como to create
     * @return the ResponseEntity with status 201 (Created) and with body the new como, or with status 400 (Bad Request) if the como has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comos")
    @Timed
    public ResponseEntity<Como> createComo(@RequestBody Como como) throws URISyntaxException {
        log.debug("REST request to save Como : {}", como);
        if (como.getId() != null) {
            throw new BadRequestAlertException("A new como cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Como result = comoRepository.save(como);
        comoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/comos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comos : Updates an existing como.
     *
     * @param como the como to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated como,
     * or with status 400 (Bad Request) if the como is not valid,
     * or with status 500 (Internal Server Error) if the como couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comos")
    @Timed
    public ResponseEntity<Como> updateComo(@RequestBody Como como) throws URISyntaxException {
        log.debug("REST request to update Como : {}", como);
        if (como.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Como result = comoRepository.save(como);
        comoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, como.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comos : get all the comos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of comos in body
     */
    @GetMapping("/comos")
    @Timed
    public List<Como> getAllComos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Comos");
        return comoRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /comos/:id : get the "id" como.
     *
     * @param id the id of the como to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the como, or with status 404 (Not Found)
     */
    @GetMapping("/comos/{id}")
    @Timed
    public ResponseEntity<Como> getComo(@PathVariable Long id) {
        log.debug("REST request to get Como : {}", id);
        Optional<Como> como = comoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(como);
    }

    /**
     * DELETE  /comos/:id : delete the "id" como.
     *
     * @param id the id of the como to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comos/{id}")
    @Timed
    public ResponseEntity<Void> deleteComo(@PathVariable Long id) {
        log.debug("REST request to delete Como : {}", id);

        comoRepository.deleteById(id);
        comoSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/comos?query=:query : search for the como corresponding
     * to the query.
     *
     * @param query the query of the como search
     * @return the result of the search
     */
    @GetMapping("/_search/comos")
    @Timed
    public List<Como> searchComos(@RequestParam String query) {
        log.debug("REST request to search Comos for query {}", query);
        return StreamSupport
            .stream(comoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
