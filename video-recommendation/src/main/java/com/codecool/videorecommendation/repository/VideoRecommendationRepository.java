package com.codecool.videorecommendation.repository;

import com.codecool.videorecommendation.entity.VideoRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRecommendationRepository extends JpaRepository<VideoRecommendation, Long> {
    public List<VideoRecommendation> getAllByVideoId(Long id);
}
