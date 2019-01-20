package com.pichincha.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.pichincha.domain.enumeration.Type;

/**
 * A Como.
 */
@Entity
@Table(name = "como")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "como")
public class Como implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private String text;

    @Column(name = "claps")
    private Integer claps;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private Type type;

    @OneToOne    @JoinColumn(unique = true)
    private User createdBy;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "como_tag",
               joinColumns = @JoinColumn(name = "comos_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tags_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Como title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public Como text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getClaps() {
        return claps;
    }

    public Como claps(Integer claps) {
        this.claps = claps;
        return this;
    }

    public void setClaps(Integer claps) {
        this.claps = claps;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public Como createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Type getType() {
        return type;
    }

    public Como type(Type type) {
        this.type = type;
        return this;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public Como createdBy(User user) {
        this.createdBy = user;
        return this;
    }

    public void setCreatedBy(User user) {
        this.createdBy = user;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Como tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Como addTag(Tag tag) {
        this.tags.add(tag);
        tag.getComos().add(this);
        return this;
    }

    public Como removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getComos().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Como como = (Como) o;
        if (como.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), como.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Como{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", text='" + getText() + "'" +
            ", claps=" + getClaps() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
