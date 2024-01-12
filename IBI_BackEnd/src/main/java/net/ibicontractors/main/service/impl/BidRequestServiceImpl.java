package net.ibicontractors.main.service.impl;

import lombok.AllArgsConstructor;
import net.ibicontractors.main.dto.BidRequestDto;
import net.ibicontractors.main.entity.BidRequest;
import net.ibicontractors.main.exception.ResourceNotFoundException;
import net.ibicontractors.main.mapper.BidRequestMapper;
import net.ibicontractors.main.repositories.BidRequestRepository;
import net.ibicontractors.main.service.BidRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BidRequestServiceImpl implements BidRequestService {

    private BidRequestRepository bidRequestRepository;
    @Override
    public BidRequestDto createBidRequest(BidRequestDto bidRequestDto) {
        BidRequest bidRequest = BidRequestMapper.mapToBidRequest(bidRequestDto);
        BidRequest savedRequest = bidRequestRepository.save(bidRequest);
        return BidRequestMapper.mapToBidRequestDto(savedRequest);

    }

    @Override
    public BidRequestDto getBidRequestById(Long requestId) {
        BidRequest bidRequest = bidRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Request Not Found With Id: " + requestId));
        return BidRequestMapper.mapToBidRequestDto(bidRequest);
    }

    @Override
    public List<BidRequestDto> getAllBidRequests() {
        List<BidRequest> requests = bidRequestRepository.findAll();
        return requests.stream().map(BidRequestMapper::mapToBidRequestDto).collect(Collectors.toList());
    }

    @Override
    public BidRequestDto updateBidRequest(Long requestId, BidRequestDto updatedRequest) {
        BidRequest originalRequest = bidRequestRepository.findById(requestId).orElseThrow(() ->
                new ResourceNotFoundException("Request Not Found With Id: " + requestId));
        originalRequest.setFirstName(updatedRequest.getFirstName());
        originalRequest.setLastName(updatedRequest.getLastName());
        originalRequest.setEmail(updatedRequest.getEmail());
        originalRequest.setRequestBody(updatedRequest.getRequestBody());
        originalRequest.setCity(updatedRequest.getCity());
        originalRequest.setPhoneNumber(updatedRequest.getPhoneNumber());
        BidRequest savedUpdatedRequest = bidRequestRepository.save(originalRequest);
        return BidRequestMapper.mapToBidRequestDto(savedUpdatedRequest);
    }

    @Override
    public void deleteRequest(Long requestId) {
        BidRequest originalRequest = bidRequestRepository.findById(requestId).orElseThrow(() ->
                new ResourceNotFoundException("Request Not Found With Id: " + requestId));
        bidRequestRepository.delete(originalRequest);
    }
}
