package com.pichincha.web.rest;

import com.pichincha.Poc6ComoEntityDesignApp;

import com.pichincha.domain.Como;
import com.pichincha.repository.ComoRepository;
import com.pichincha.repository.search.ComoSearchRepository;
import com.pichincha.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import static com.pichincha.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pichincha.domain.enumeration.Type;
/**
 * Test class for the ComoResource REST controller.
 *
 * @see ComoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Poc6ComoEntityDesignApp.class)
public class ComoResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final Integer DEFAULT_CLAPS = 1;
    private static final Integer UPDATED_CLAPS = 2;

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final Type DEFAULT_TYPE = Type.Como;
    private static final Type UPDATED_TYPE = Type.Question;

    @Autowired
    private ComoRepository comoRepository;

    @Mock
    private ComoRepository comoRepositoryMock;

    /**
     * This repository is mocked in the com.pichincha.repository.search test package.
     *
     * @see com.pichincha.repository.search.ComoSearchRepositoryMockConfiguration
     */
    @Autowired
    private ComoSearchRepository mockComoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restComoMockMvc;

    private Como como;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComoResource comoResource = new ComoResource(comoRepository, mockComoSearchRepository);
        this.restComoMockMvc = MockMvcBuilders.standaloneSetup(comoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Como createEntity(EntityManager em) {
        Como como = new Como()
            .title(DEFAULT_TITLE)
            .text(DEFAULT_TEXT)
            .claps(DEFAULT_CLAPS)
            .createdAt(DEFAULT_CREATED_AT)
            .type(DEFAULT_TYPE);
        return como;
    }

    @Before
    public void initTest() {
        como = createEntity(em);
    }

    @Test
    @Transactional
    public void createComo() throws Exception {
        int databaseSizeBeforeCreate = comoRepository.findAll().size();

        // Create the Como
        restComoMockMvc.perform(post("/api/comos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(como)))
            .andExpect(status().isCreated());

        // Validate the Como in the database
        List<Como> comoList = comoRepository.findAll();
        assertThat(comoList).hasSize(databaseSizeBeforeCreate + 1);
        Como testComo = comoList.get(comoList.size() - 1);
        assertThat(testComo.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testComo.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testComo.getClaps()).isEqualTo(DEFAULT_CLAPS);
        assertThat(testComo.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testComo.getType()).isEqualTo(DEFAULT_TYPE);

        // Validate the Como in Elasticsearch
        verify(mockComoSearchRepository, times(1)).save(testComo);
    }

    @Test
    @Transactional
    public void createComoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comoRepository.findAll().size();

        // Create the Como with an existing ID
        como.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComoMockMvc.perform(post("/api/comos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(como)))
            .andExpect(status().isBadRequest());

        // Validate the Como in the database
        List<Como> comoList = comoRepository.findAll();
        assertThat(comoList).hasSize(databaseSizeBeforeCreate);

        // Validate the Como in Elasticsearch
        verify(mockComoSearchRepository, times(0)).save(como);
    }

    @Test
    @Transactional
    public void getAllComos() throws Exception {
        // Initialize the database
        comoRepository.saveAndFlush(como);

        // Get all the comoList
        restComoMockMvc.perform(get("/api/comos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(como.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].claps").value(hasItem(DEFAULT_CLAPS)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllComosWithEagerRelationshipsIsEnabled() throws Exception {
        ComoResource comoResource = new ComoResource(comoRepositoryMock, mockComoSearchRepository);
        when(comoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restComoMockMvc = MockMvcBuilders.standaloneSetup(comoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restComoMockMvc.perform(get("/api/comos?eagerload=true"))
        .andExpect(status().isOk());

        verify(comoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllComosWithEagerRelationshipsIsNotEnabled() throws Exception {
        ComoResource comoResource = new ComoResource(comoRepositoryMock, mockComoSearchRepository);
            when(comoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restComoMockMvc = MockMvcBuilders.standaloneSetup(comoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restComoMockMvc.perform(get("/api/comos?eagerload=true"))
        .andExpect(status().isOk());

            verify(comoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getComo() throws Exception {
        // Initialize the database
        comoRepository.saveAndFlush(como);

        // Get the como
        restComoMockMvc.perform(get("/api/comos/{id}", como.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(como.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.claps").value(DEFAULT_CLAPS))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComo() throws Exception {
        // Get the como
        restComoMockMvc.perform(get("/api/comos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComo() throws Exception {
        // Initialize the database
        comoRepository.saveAndFlush(como);

        int databaseSizeBeforeUpdate = comoRepository.findAll().size();

        // Update the como
        Como updatedComo = comoRepository.findById(como.getId()).get();
        // Disconnect from session so that the updates on updatedComo are not directly saved in db
        em.detach(updatedComo);
        updatedComo
            .title(UPDATED_TITLE)
            .text(UPDATED_TEXT)
            .claps(UPDATED_CLAPS)
            .createdAt(UPDATED_CREATED_AT)
            .type(UPDATED_TYPE);

        restComoMockMvc.perform(put("/api/comos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComo)))
            .andExpect(status().isOk());

        // Validate the Como in the database
        List<Como> comoList = comoRepository.findAll();
        assertThat(comoList).hasSize(databaseSizeBeforeUpdate);
        Como testComo = comoList.get(comoList.size() - 1);
        assertThat(testComo.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testComo.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testComo.getClaps()).isEqualTo(UPDATED_CLAPS);
        assertThat(testComo.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testComo.getType()).isEqualTo(UPDATED_TYPE);

        // Validate the Como in Elasticsearch
        verify(mockComoSearchRepository, times(1)).save(testComo);
    }

    @Test
    @Transactional
    public void updateNonExistingComo() throws Exception {
        int databaseSizeBeforeUpdate = comoRepository.findAll().size();

        // Create the Como

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComoMockMvc.perform(put("/api/comos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(como)))
            .andExpect(status().isBadRequest());

        // Validate the Como in the database
        List<Como> comoList = comoRepository.findAll();
        assertThat(comoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Como in Elasticsearch
        verify(mockComoSearchRepository, times(0)).save(como);
    }

    @Test
    @Transactional
    public void deleteComo() throws Exception {
        // Initialize the database
        comoRepository.saveAndFlush(como);

        int databaseSizeBeforeDelete = comoRepository.findAll().size();

        // Get the como
        restComoMockMvc.perform(delete("/api/comos/{id}", como.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Como> comoList = comoRepository.findAll();
        assertThat(comoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Como in Elasticsearch
        verify(mockComoSearchRepository, times(1)).deleteById(como.getId());
    }

    @Test
    @Transactional
    public void searchComo() throws Exception {
        // Initialize the database
        comoRepository.saveAndFlush(como);
        when(mockComoSearchRepository.search(queryStringQuery("id:" + como.getId())))
            .thenReturn(Collections.singletonList(como));
        // Search the como
        restComoMockMvc.perform(get("/api/_search/comos?query=id:" + como.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(como.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].claps").value(hasItem(DEFAULT_CLAPS)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Como.class);
        Como como1 = new Como();
        como1.setId(1L);
        Como como2 = new Como();
        como2.setId(como1.getId());
        assertThat(como1).isEqualTo(como2);
        como2.setId(2L);
        assertThat(como1).isNotEqualTo(como2);
        como1.setId(null);
        assertThat(como1).isNotEqualTo(como2);
    }
}
