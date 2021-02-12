package com.codecool.video.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VideoRecommendation {
    private Long id;
    private int rating;
    private String comment;
    private Long videoId;
}
