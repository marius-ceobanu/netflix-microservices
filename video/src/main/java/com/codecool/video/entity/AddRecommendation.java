package com.codecool.video.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddRecommendation {
    private String rating;
    private String comment;
    private String videoId;
}
