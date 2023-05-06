const router = require("express").Router();

router.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;

  const pool = await db;
  
  /* Password must be hashed before save it! */

  try {
    await pool.query(sql.unsafe`
      INSERT INTO users (name, password, email) 
      VALUES (${name}, ${password}, ${email})
    `);

    nodemailer({ email });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
