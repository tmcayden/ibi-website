package net.ibicontractors.main.service;

import net.ibicontractors.main.dto.BidRequestDto;

import java.util.List;

public interface BidRequestService {

    BidRequestDto createBidRequest(BidRequestDto bidRequestDto);

    BidRequestDto getBidRequestById(Long requestId);

    List<BidRequestDto> getAllBidRequests();

    BidRequestDto updateBidRequest(Long requestId, BidRequestDto updatedRequest);

    void deleteRequest(Long requestId);
}
