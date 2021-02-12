package com.codecool.videorecommendation.service;

import com.codecool.videorecommendation.entity.VideoRecommendation;
import com.codecool.videorecommendation.repository.VideoRecommendationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class VideoRecommendationService {

    private final VideoRecommendationRepository videoRecommendationRepository;

    public List<VideoRecommendation> getRecommendationsForVideo(Long id) {
        return videoRecommendationRepository.getAllByVideoId(id);
    }

    public void addRecommendation(int rating, String comment, Long videoId) {
        VideoRecommendation videoRecommendation = VideoRecommendation.builder()
                                                        .rating(rating)
                                                        .comment(comment)
                                                        .videoId(videoId)
                                                        .build();
        videoRecommendationRepository.save(videoRecommendation);
    }

    @PostConstruct
    public void afterInit() {
        for(int i = 1; i < 4; i++) {
            VideoRecommendation videoRecommendation = VideoRecommendation.builder()
                    .rating(2+i)
                    .comment("Best video " + i)
                    .videoId((long) i)
                    .build();
            videoRecommendationRepository.save(videoRecommendation);
        }
        videoRecommendationRepository.findAll().forEach(r -> log.info("Video recommendation: " + r.toString()));
    }
}
