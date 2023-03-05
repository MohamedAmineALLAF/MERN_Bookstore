
import * as React from "react"
import { Box, Typography } from "@mui/material"
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// features with tighter spacing
export default function FeaturesSmallColumn({
  features = [
    {
      icon: <FlashOnIcon />,
      title: "Quick delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero et est blandit convallis quis quis purus. Vivamus non ipsum in eros vulputate ullamcorper",
    },
    {
      icon: <AssuredWorkloadIcon />,
      title: "Secure payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero et est blandit convallis quis quis purus. Vivamus non ipsum in eros vulputate ullamcorper",
    },
    {
      icon: <ThumbUpIcon />,
      title: "Quality guaranted",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero et est blandit convallis quis quis purus. Vivamus non ipsum in eros vulputate ullamcorper",
    }
  ],
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          sm: "repeat(2,minmax(0,1fr))",
          md: "repeat(3,minmax(0,1fr))",
        },
        gap: 4,
        
        paddingRight:20,
        paddingLeft:20,
        justifyItems:"center"
      }}
    >
      {features.map(feature => {
        return (
          <Feature
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        )
      })}
    </Box>
  )
}
function Feature({ title, description, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        fontSize: "md",
        lineHeight: 1.5,
        gap: 1,
      }}
    >
      <Box>{icon}</Box>
      <Typography
        sx={{
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {description}
    </Box>
  )
}
