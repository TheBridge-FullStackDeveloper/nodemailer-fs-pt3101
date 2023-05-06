const router = require("express").Router();

router.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;

  const pool = await db;

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

//create a route to signin a user
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const pool = await db;

  try {
    const user = await pool.query(sql.unsafe`
      SELECT * FROM users WHERE email = ${email} AND password = ${password}
    `);

    if (user.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
