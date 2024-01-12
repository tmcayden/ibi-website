package net.ibicontractors.main.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "bid_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BidRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;
    private String firstName;
    private String lastName;
    private String email;
    @Lob
    private String requestBody;
    private String phoneNumber;
    private String city;
}
