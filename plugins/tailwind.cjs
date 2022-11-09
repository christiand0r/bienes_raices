const plugin = require("tailwindcss/plugin");

const customVariants = plugin(({ addVariant }) => {
  addVariant("scroll", "&::-webkit-scrollbar");
  addVariant("scroll-thumb", "&::-webkit-scrollbar-thumb");
  addVariant("children", "& *");
  addVariant("children-directs", "& > *");
});

module.exports = {
  customVariants,
};
