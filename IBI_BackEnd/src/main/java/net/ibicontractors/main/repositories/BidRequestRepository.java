package net.ibicontractors.main.repositories;

import net.ibicontractors.main.entity.BidRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRequestRepository extends JpaRepository<BidRequest, Long> {
}
