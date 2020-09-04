/**
 * Enum for type of Payments.
 * @readonly
 * @enum {int}
 */
export const PaymentType = Object.freeze({
    FASTAG: 1,
    PH:     2,
    CASH:   3
  });
  
  /**
   * Enum for status of car
   * @readonly
   * @enum {int}
   */
  export const CarStatus = Object.freeze({
    LEFT:       0,
    PARKED:     1,
    REQUESTED:  2
  });
  
  
  /**
   * Enum for error codes
   * @readonly
   * @enum {int}
   */
  export const ErrorCode = Object.freeze({
    
      DB_CONN_ERR : 1
  
  })
  
  
  /**
   * Enum for Vehicle Type
   * @readonly
   * @enum {int}
   */
  export const VehicleType = Object.freeze({
    
    CAR : 0,
    BIKE: 1
  
  })
  
  export const CUTOFF = 30;
   
  //export default PaymentType;
  