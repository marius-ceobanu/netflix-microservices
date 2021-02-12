package com.codecool.videorecommendation.controller;

import com.codecool.videorecommendation.entity.RecommendationRequest;
import com.codecool.videorecommendation.entity.VideoRecommendation;
import com.codecool.videorecommendation.service.VideoRecommendationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/recommendation")
public class VideoRecommendationController {

    @Autowired
    private VideoRecommendationService videoRecommendationService;

    @GetMapping("/{id}")
    public List<VideoRecommendation> getRecommendations(@PathVariable String id) {
        return videoRecommendationService.getRecommendationsForVideo(Long.parseLong(id));
    }

    @PostMapping("/add")
    public void addRecommendation(@RequestBody RecommendationRequest recommendation) {
        videoRecommendationService.addRecommendation(Integer.parseInt(recommendation.getRating()),
                                                        recommendation.getComment(),
                                                        Long.parseLong(recommendation.getVideoId())
                                                    );
    }
}
