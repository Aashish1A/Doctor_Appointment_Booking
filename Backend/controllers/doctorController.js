

export const changeAvailability = async(req, res) => {
  try {
   
  } catch (error) {
    console.log(error);
    res.send({success: false, message: error.message });
  }
}