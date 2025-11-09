
export const changeAvailability = async(req, res) => {
  try {
    
    res.send({success: true, message: "Availability status changed", data: doctor });
  } catch (error) {
    console.log(error);
    res.send({success: false, message: error.message });
  }
}