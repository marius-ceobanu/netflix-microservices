package com.codecool.videorecommendation.service;

import com.codecool.videorecommendation.entity.VideoRecommendation;
import com.codecool.videorecommendation.repository.VideoRecommendationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class VideoRecommendationServiceTest {

    @Autowired
    private VideoRecommendationService videoRecommendationService;

    @Autowired
    private VideoRecommendationRepository videoRecommendationRepository;

    @Test
    public void addNewRecommendation() {

        videoRecommendationService.addRecommendation(2, "Best video", 1L);
        Assertions.assertEquals(4, videoRecommendationRepository.findAll().size());
    }

    @Test
    public void getRecommendationsForVideoById() {

        VideoRecommendation videoRecommendationExpected = VideoRecommendation.builder()
                .rating(3)
                .comment("Best video 1")
                .videoId(1L)
                .build();
        Assertions.assertEquals(videoRecommendationExpected.getComment(), videoRecommendationService.getRecommendationsForVideo(1L).get(0).getComment());
    }
}