package net.ibicontractors.main.mapper;

import net.ibicontractors.main.dto.BidRequestDto;
import net.ibicontractors.main.entity.BidRequest;

public class BidRequestMapper {
    public static BidRequestDto mapToBidRequestDto(BidRequest bidRequest){
        return new BidRequestDto(
                bidRequest.getRequestId(),
                bidRequest.getFirstName(),
                bidRequest.getLastName(),
                bidRequest.getEmail(),
                bidRequest.getRequestBody(),
                bidRequest.getPhoneNumber(),
                bidRequest.getCity());
    }

    public static BidRequest mapToBidRequest(BidRequestDto bidRequestDto){
        BidRequest bidRequest = new BidRequest();
        bidRequest.setRequestId(bidRequestDto.getRequestId());
        bidRequest.setFirstName(bidRequestDto.getFirstName());
        bidRequest.setLastName(bidRequestDto.getLastName());
        bidRequest.setEmail(bidRequestDto.getEmail());
        bidRequest.setPhoneNumber(bidRequestDto.getPhoneNumber());
        bidRequest.setRequestBody(bidRequestDto.getRequestBody());
        bidRequest.setCity(bidRequestDto.getCity());
        return bidRequest;
    }
}
