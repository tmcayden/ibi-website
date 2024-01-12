package net.ibicontractors.main.controllers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import net.ibicontractors.main.dto.BidRequestDto;
import net.ibicontractors.main.entity.BidRequest;
import net.ibicontractors.main.service.BidRequestService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bidRequests")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000")
public class BidRequestController {
    private BidRequestService bidRequestService;

    // Build Create Request API
    @PostMapping()
    public ResponseEntity<BidRequestDto> createRequest(@RequestBody BidRequestDto bidRequestDto) {
        BidRequestDto savedRequest = bidRequestService.createBidRequest(bidRequestDto);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    // Build Get Request by id API

    @GetMapping("{id}")
    public ResponseEntity<BidRequestDto> getRequestById(@PathVariable("id")Long id){
        BidRequestDto bidRequestDto = bidRequestService.getBidRequestById(id);
        return ResponseEntity.ok(bidRequestDto);
    }

    // Build Get All Requests API

    @GetMapping()
    public ResponseEntity<List<BidRequestDto>> getAllRequests() {
        List<BidRequestDto> requests = bidRequestService.getAllBidRequests();
        return ResponseEntity.ok(requests);
    }

    // Build Update Request API

    @PutMapping("{id}")
    public ResponseEntity<BidRequestDto> updateRequest(@PathVariable("id") Long requestId, @RequestBody BidRequestDto bidRequestDto){
        BidRequestDto updatedRequest = bidRequestService.updateBidRequest(requestId, bidRequestDto);
        return ResponseEntity.ok(updatedRequest);
    }

    // Build Delete Request API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRequest(@PathVariable("id") Long requestId) {
        BidRequestDto requestToBeDeleted = bidRequestService.getBidRequestById(requestId);
        bidRequestService.deleteRequest(requestId);
        return ResponseEntity.ok(
                requestToBeDeleted.getFirstName() + " " + requestToBeDeleted.getLastName() +
                        "'s request has been deleted. (Request #" +  requestId + ")");
    }

}