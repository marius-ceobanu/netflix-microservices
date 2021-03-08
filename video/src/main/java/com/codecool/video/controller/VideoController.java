package com.codecool.video.controller;

import com.codecool.video.entity.AddRecommendation;
import com.codecool.video.entity.Video;
import com.codecool.video.entity.VideoRecommendation;
import com.codecool.video.service.RecommendationServiceCaller;
import com.codecool.video.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private RecommendationServiceCaller recommendationServiceCaller;

    @GetMapping("/all")
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("/{id}")
    public Video getVideo(@PathVariable String id) {
        return videoService.getVideo(Long.parseLong(id));
    }

    @GetMapping("/{id}/recommendations")
    public List<VideoRecommendation> getRecommendations(@PathVariable String id) {
        return recommendationServiceCaller.getRecommendationsForVideo(Long.parseLong(id));
    }

    @PostMapping("/{id}/addrecommendation")
    public void addRecommendation(@PathVariable String id, @RequestBody AddRecommendation recommendation) {
        log.info("adding recommendation for Q " + id);
        recommendationServiceCaller.addRecommendation(recommendation);
    }
}
