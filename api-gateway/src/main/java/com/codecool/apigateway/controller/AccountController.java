package com.codecool.apigateway.controller;

import com.codecool.apigateway.dto.UserCredentials;
import com.codecool.apigateway.dto.UserLoginResponse;
import com.codecool.apigateway.entity.DbUser;
import com.codecool.apigateway.repository.DbUserRepository;
import com.codecool.apigateway.security.JwtTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class AccountController {

    private final DbUserRepository dbUserRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("test response");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserCredentials form) {
        try {
            DbUser user = DbUser.builder().username(form.getUsername())
                                            .password(BCrypt.hashpw(form.getPassword(), BCrypt.gensalt(12)))
                                            .roles(Arrays.asList("ROLE_USER"))
                                            .build();
            dbUserRepository.save(user);
            return ResponseEntity.ok("Account created!");
        } catch (Exception e) {
            throw new BadCredentialsException("Accound could not be created!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserCredentials form) {
        try {
            String username = form.getUsername();

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, form.getPassword())
            );

            List<String> roles = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            String token = jwtTokenService.createToken(username, roles);

            ResponseCookie springCookie = ResponseCookie.from("ACCESS_TOKEN", token)
//                    .httpOnly(true)
//                    .secure(true)
//                    .path("/")
//                    .maxAge(60)
//                    .domain("example.com")
                    .build();
            System.out.println(springCookie);

            UserLoginResponse response = UserLoginResponse.builder()
                    .username(username)
                    .roles(roles)
                    .token(token)
                    .build();

            System.out.println(response.toString());

//            res.addCookie(new Cookie("ACCESS_TOKEN", token));
//            return new ResponseEntity<String>(username,HttpStatus.OK);

            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, springCookie.toString()).body(response);

        } catch (UsernameNotFoundException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }
}
