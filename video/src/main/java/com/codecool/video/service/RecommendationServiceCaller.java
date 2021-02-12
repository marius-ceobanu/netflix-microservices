package com.codecool.video.service;

import com.codecool.video.entity.AddRecommendation;
import com.codecool.video.entity.VideoRecommendation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RecommendationServiceCaller {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${videorecommendation.url}")
    private String baseUrl;

    public List<VideoRecommendation> getRecommendationsForVideo(Long id) {
        ResponseEntity<VideoRecommendation[]> resp = restTemplate.getForEntity(baseUrl + "/" + id, VideoRecommendation[].class);
        VideoRecommendation[] recommendations = resp.getBody();
        assert recommendations != null;
        log.info("Got rec. for Q " + id + " ==" + Arrays.toString(recommendations));
        return Arrays.stream(recommendations).collect(Collectors.toList());
    }

    public void addRecommendation(AddRecommendation recommendation) {
        log.info("Add new rec. " + recommendation.toString());
        restTemplate.postForEntity(baseUrl + "/add", recommendation, ResponseEntity.class);
    }
}
